#!/usr/bin/env bash
echo "sed data not made yet"

 mysql -u root piedev < $(dirname $0)/truncate_data.sql
 mysql -u root piedev < $(dirname $0)/seed_data.sql
