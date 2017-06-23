#!/bin/bash
file_path="./extension/env/"

test_file=${file_path}"test.flag"
prod_file=${file_path}"prod.flag"
rc_file=${file_path}"rc.flag"

if [  -f "${prod_file}" ]; then
   mv  $prod_file $rc_file
   echo "running env changed rc.."
   ls $file_path
elif [  -f "${rc_file}" ]; then
   mv  $rc_file $test_file
   echo "running env changed test.."
   ls $file_path
elif [  -f "${test_file}" ]; then
   mv  $test_file $prod_file
   echo "running env changed prod.."
   ls $file_path
else 
  echo $file_path "no prod.flag and rc.flag"
  ls $file_path
fi
