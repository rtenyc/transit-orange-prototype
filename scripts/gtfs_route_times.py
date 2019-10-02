import argparse
from collections import OrderedDict
import csv
from datetime import datetime
import fiona
from fiona.crs import from_epsg
import os

"""
Given a directory of GTFS data describing fixed routes, create a GeoJSON file
that contains a line for each route and the start and end times for that route
for each day of the week.
"""

def read_csv(dirname, filename):
    with open(os.path.join(dirname, filename)) as f:
        return list(csv.DictReader(f))

def trip_on_day(calendar, trip, day):
    calendar_entry = [c for c in calendar 
            if c['service_id'] == trip['service_id']][0]
    return calendar_entry[day] == '1'

def get_route_geometry(trips, route):
    route_shapes = list({t['shape_id'] for t in trips})

    coordinates = []
    for shape in route_shapes:
        points = [s for s in shapes if s['shape_id'] == shape]
        points = sorted(points, key=lambda p: int(p['shape_pt_sequence']))
        coordinates.append([(float(p['shape_pt_lon']), float(p['shape_pt_lat']))
            for p in points])

    return {
        'type': 'MultiLineString',
        'coordinates': coordinates
    }

def get_route_properties(calendar, days, stop_times, route_trips, route):
    props = OrderedDict([
        ('route_id', route['route_id']),
        ('route_name', route['route_long_name'])
    ])

    for day in days:
        day_trips = [t for t in route_trips if trip_on_day(calendar, t, day)]
        day_times = []

        for trip in day_trips:
            trip_times = [t for t in stop_times if t['trip_id'] == trip['trip_id']]
            day_times.extend([t['arrival_time'] for t in trip_times])
            day_times.extend([t['departure_time'] for t in trip_times])

        day_times = [datetime.strptime(t, '%H:%M:%S').time() for t in day_times
                if t != '']
        day_times = sorted(day_times)

        if day_times:
            props[day.replace('day', '_min')] = day_times[0].strftime('%H%M')
            props[day.replace('day', '_max')] = day_times[-1].strftime('%H%M')
        else:
            props[day.replace('day', '_min')] = None
            props[day.replace('day', '_max')] = None

    return props

def get_route(calendar, days, shapes, stop_times, trips, route):
    """
    Combine route information, availability, and the shape defined for that
    route
    """
    route_trips = [t for t in trips if t['route_id'] == route['route_id']]
    return {
        'geometry': get_route_geometry(route_trips, route),
        'properties': get_route_properties(calendar, days, stop_times,
            route_trips, route)
    }

def open_output_file(directory, outfile, days):
    day_fields = []
    for day in days:
        day_fields.append((day.replace('day', '_min'), 'str'))
        day_fields.append((day.replace('day', '_max'), 'str'))

    return fiona.open(
        os.path.join(directory, outfile),
        'w',
        driver='GeoJSON',
        crs=from_epsg(4326),
        schema={
            'geometry': 'MultiLineString',
            'properties': OrderedDict([
                ('route_id', 'str'),
                ('route_name', 'str'),
                *day_fields
            ])
        }
    )

if __name__ == '__main__':
    # Parse command line arguments
    parser = argparse.ArgumentParser(
            description='Find service start and end times from GTFS files')
    parser.add_argument('directory', help='The directory to work from')
    parser.add_argument('-o', '--outfile',
            default='routes.geojson', help='The output filename')
    args = parser.parse_args()

    # Load all of the CSVs
    calendar = read_csv(args.directory, 'calendar.txt')
    routes = read_csv(args.directory, 'routes.txt')
    shapes = read_csv(args.directory, 'shapes.txt')
    stop_times = read_csv(args.directory, 'stop_times.txt')
    trips = read_csv(args.directory, 'trips.txt')

    days = [k for k in calendar[0].keys() if k.endswith('day')]

    routes_to_write = [get_route(calendar, days, shapes, stop_times, trips, r) 
            for r in routes]

    with open_output_file(args.directory, args.outfile, days) as routes:
        for route in routes_to_write:
            routes.write(route)
