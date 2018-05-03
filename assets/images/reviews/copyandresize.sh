#!/bin/bash

materials=( acrylic-mandala acrylic-burst leather-black-pink leather-black leather-tan wood-mandala wood-star-9point wood-star-18point )
angles=( on off back side chargecable worn oblique )

sizes=( "" "@2x" "-thumbnail" "-thumbnail@2x" )
dimensions=( 508 1016 273 546 )

for material in ${materials[@]}
do
  #echo $material
  echo 'Working in '$material' folder'
  #ls $material
  cd $material
  #pwd

  for angle in ${angles[@]}
  do
    echo '  Copying and resizing '$angle
  
    for sizeKey in ${!sizes[@]}
    do
    #  pwd
      cp $angle-original.jpg $angle${sizes[$sizeKey]}.jpg
      sips -Z ${dimensions[$sizeKey]} $angles${sizes[$sizeKey]}.jpg  > /dev/null 2>&1
    done


  done
  cd ../

done

