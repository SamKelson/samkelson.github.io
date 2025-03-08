---
permalink: /projects/robotic_tracking_car_enclosure/
title: "ENGR11a: Robotic Tracking Car Enclosure"
date: 2024-07-07
classes: wide
show_date: true
toc: true
toc_label: "Contents"
header:
  #todo: fix header image
  overlay_image: /assets/images/RobotCarProj/MysteryMachineBanner.jpg
  overlay_filter: 0.4
description: "Designing a chassis enclosure for a robotic tracking car"
---

## Introduction

For this project, I explored the fundamentals of electronics prototyping, integrating soldering and component assembly with iterative design processes. Working in a team, we designed and fabricated a custom chassis enclosure for a robotic system, ensuring form, fit, and function through multiple design iterations. Using Autodesk Fusion 360, we developed CAD models and utilized both 3D printing and laser cutting to refine our designs. Key challenges included ensuring accessibility for sensors, wheels, and power components while maintaining the overall fit of the enclosure. This hands-on project strengthened my skills in rapid prototyping, digital fabrication, and collaborative design.

## Robot Assembly

For the first part of this project, my group and I had to assemble our individual D2-5 Intelligent Tracking Car DIY kit robots following [these instructions.](https://m.media-amazon.com/images/I/A1lEYFXJO1L.pdf#page=1&zoom=auto,-83,848) Upon a first read of the instruction manual, I really liked the pictures they added for each step, it might it pretty clear what parts went where. One area that seemed a bit weak was the drive shaft assembly. The working and optimizing the fit of the worm gear is not well described and this would go on to be a problem later.

The first step in this process involved soldering, something I was familiar with but for my teammates was a new skill. However, with my occasional assistance, all of us were able to  solder the electronic components to each of our own boards which we worked on simultaneously. 

![Me Soldering](../assets/images/RobotCarProj/MeSoldering.jpg)

The electronic assembly of the cars was pretty straightforward. The main challenge was making sure all components were soldered in the right orientations, mainly the LEDs, capacitors, and transistors. Additionally, some of the soldering iron tips worked better than others and dialing in the correct temperatures was a bit challenging. Finally, the biggest challenge, even for someone experienced with soldering, was making sure to not hold the iron too long on the circuit board. Holding the iron too long on the board can cause the existing solder pads on the PCB to come off of the traces making it impossible for the component to get a good electrical connection. This is a problem I ran into head on. 

When I first put the batteries into my car I noticed immediately one of the lights that reflects into the photoresistor was not working.

![alt text](../assets/images/RobotCarProj/LEDNotOn.jpg)

After a bit of playing around with a separate battery 'power supply' and multimeter I realized that the one of the capacitors was interrupting the circuit. I elected to remove this capacitor and to replace it. However while doing so I desoldered both pads of the capacitor slot. After doing so I had lost hope in getting the car to work properly. Powering through I was able to look at the circuit diagram and the traces on the PCB and simply completed the circuit with wires, bypassing the capacitor. This worked! I covered the wires in hot glue to prevent any accidental electrical contacts.

![LED Fix (covered in hot glue)](../assets/images/RobotCarProj/LEDFix.jpg)

The final hurtle to jump was getting the worm gear to drive the wheels properly. This is one area where I believe the instruction manual was lacking. In order for the motors to give the wheels enough torque to move the car the teeth of the worm gear had to mesh well with the teeth of the gear on the axle. This was harder said then done as there was a good amount of play between the various parts that make up the drive train. The most useful tip I found was to tightened down the screws attaching the three way sleeve to the PCB after an initial assembly as much as possible. Also, I feel another pair of gaskets to prevent the gear and axle assembly from moving would be helpful.

Here is a video of the bot moving along a track: 

<video controls src="/assets/images/RobotCarProj/CarMoving.mp4" title="Car on Track" style='width: -webkit-fill-available'></video>

## Measurements

For the next part of the project we needed the dimensions of the PCB so we could model it in Fusion and make a chassis enclosure. I used digital calipers to take measurements.

![Taking Measurements](../assets/images/RobotCarProj/TakingMeasurements.jpg)

And here are all of them imported into Fusion as parameters.

![Measurements](../assets/images/RobotCarProj/Measurements.png)