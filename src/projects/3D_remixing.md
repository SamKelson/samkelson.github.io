---
permalink: /projects/3D_remixing/
title: "3D Remixing"
date: 2024-02-04
classes: wide
show_date: true
toc: true
toc_label: "Contents"
header:
  //todo: fix header image
  overlay_image: /assets/images/RemixingProject/FirstPrintAttemptFinish.jpg
  overlay_filter: 0.4
description: "3D Printing a Remixed Cable Organizer"
---



## Introduction
In this project, I explored the process of remixing 3D files to create novel 3D prints by modifying existing models and combining different designs for new functionality. Using CAD tools like Tinkercad and Autodesk Fusion, I imported a [publicly available 3D model](https://www.thingiverse.com/thing:4746510) and transformed it into a customized cable organizer by adding new features to improve its usability. This experience strengthened my ability to edit and remix digital designs, equipping me with the skills to leverage 3D printing and CAD software for creative problem-solving in engineering and design challenges.

## The Problem
Under my bed are storage drawers where I store my cloths and other items, and next to one of these drawers is an extension chord that I use to charge my devices. These various cables always end up getting traped into the drawer and it has caused the cables to break and fray. My goal is to make a cable organizer that I can stick to my wall to prevent the wires from getting stuck in the drawer.

![The problem](/assets/images/RemixingProject/TheProblem.jpg)

## Looking for a Solution

My first step was to find an already made 3D model I could print to solve my problem. On [Thingiverse](https://www.thingiverse.com) I found [this model](https://www.thingiverse.com/thing:4746510) which met most of my requirments. However, because it was an `.stl` file I had trouble figuring out dimensions of things and I wanted to challenge myself by making a peice that had an opening in the center to allow cables to pass through and cable 'clips' at the top. 

## Initial Model and Sketch

Below is an intial sketch of what I want.

![Sketch of what I want.](/assets/images/RemixingProject/Sketch.jpg)

## Setup on Tinkercad

After sketching and getting a basic idea of what I wanted to remix about the initial design. I attempted to import the initial `.stl` file into Tinkercad. This is where I ran into my first roadblock. The `.stl` file that I had got was too large to be uploaded to Tinkercad directly. To fix this I uploaded the file into Meshlab to reduce the number of vertices and faces in the file and thus reducing its size.

![MeshLab Settings](/assets/images/RemixingProject/MeshLabSettings.png)

I cut the number of faces in half and this was enough to allow me to upload the model into Tinkercad.

![Inital Tinkercad](/assets/images/RemixingProject/TinkercadInit.png)

The next task was to edit the peices of the organizer to fit my specifications. I wanted a peice that had an opening and a few small clips to put cables into. While the design already some components like this I wanted to create myself. 

## Editing the Model on Tinkercad

This process was a huge pain. When uploading to Tinkercad all the individual peices of the model were grouped together and in Tinkercad there is no easy way to seperate them. Therefore I followed [this tutorial](https://all3dp.com/2/tinkercad-split-object-models-tutorial/) to split the objects into individual peices. After doing this process I combined on of the peices without a center hole with one of the peices that had just a center hole. You can see the result here. 

![Final Tinkercad](/assets/images/RemixingProject/TinkercadFinal.png)

I then exporterd the result and procedded to Prusa Slicer.

## Printing

Within Prusa Slicer I had to scale the model to fit the print bed (this would cause problems later). Additionaly, to avoid bed adhesion problems I added rafts to the model. Here are pictures of the before and after slicing along with the print settings. 

![Prusa Pre-Slice](/assets/images/RemixingProject/PrusaPreSlice.png)

![Prusa Post-Slice](/assets/images/RemixingProject/PrusaPostSlice.png)

Then I began the print process.

![First Print Attempt Start](/assets/images/RemixingProject/FirstPrintAttemptStart.jpg)

## Result and Reflection

![First Print Attempt Finish](/assets/images/RemixingProject/FirstPrintAttemptFinish.jpg)

The results were a bit hit or miss. The main problem I found was the tolerances of the dovetails were not enough to take into acount the resolution of the printer and the thermal expansion of the filament as can be seen by this photo, the dovetails did not fit. 

![Does not fit](/assets/images/RemixingProject/DoesntFit.jpg)

Aditionaly, as can be in the result photo above the scaling I did in Prusa Slicer caused the cable clips to shrink dramatically making them thinner and easier to snap off along with radius of the clips being too small to fit any useful cables. Other than that things were mostly sucesfful. To improve on some of these problems it would be nessecary to closly monitor the dimensions of all these components, especially the dovetails.

Now for an attempt in Autodesk Fusion.

## Learning Autodesk Fusion

Before attempting the cable organizer in Fusion I first went throught [this series of tutorials.](https://www.autodesk.com/learn/ondemand/course/learn-fusion-for-cad-in-90-minutes) Through these tutorials I began to really enjoy 3D modeling and while it was a bit challenging I found myself excitedly completing the entire tutorial. CAD is fun! 

## Attempting to Import into Autodesk Fusion

This is where the real challenge began. After importing the `.stl` file into Fusion I quickly realised that the object was imported as a mesh rather than as bodies. This happened because `.stl` files store meshes rather than bodies, therefore in order to work in Fusion I would need to convert from meshes to bodies. This is easier said then done and while [there are tools](https://help.autodesk.com/view/fusion360/ENU/?guid=MESH-CONVERT-TO-SOLID) for this, they did not work very well for me. Therefore after using some of the mesh tools provided by Fusion to split up each peice into its individual mesh I was forced to project the intial components onto a flat plane (sketch) and rebuild everything from scratch, resketching and extruding when nessecary to create edidtable objects. I decided to delete the dovetails and remake them myself so I could add spaces to account for unkown tolerances of the printer. Here is an image of the sketch from the projection before removing the old dovetails. A keen observer would notice that none of the lines here are actual shapes editable by Fusion, instead they are custom geometrecies meaning I have no control over their shapes (besides basic scaling) unless I fully redraw them using shapes native to Fusion.

![Projection](/assets/images/RemixingProject/FusionProjection.png)

## Making the Dovetails

![No Dovetails](/assets/images/RemixingProject/FusionNoDovetails.png)

I followed these two tutorials ([makeorbreakshop](https://www.makeorbreakshop.com/project/design-dovetail-joint-in-fusion-360) and [productdesignonline](https://productdesignonline.com/fusion-360-tutorials/parametric-dovetail-joints-in-fusion-360-made-easy/)) for making the dovetails. They both make use of user defined parameters which I find to be an amazing feature of Fusion and allowed me to follow the tutorials without worrying about dimensions until I had finished the setup and allowed changes to be made super easily.

I additionaly added a paremeter to control an extra extrude that made a controllable gap between the pin and the socket of the dove tail.

![Dovetail Tolerance](/assets/images/RemixingProject/tolerances.png)

I initally set this paramter to $0.02$ inches. I then copied the pinboard and attatched it to each individual component.

Here is an image of the finished project in Fusion, you can see a lot of steps went into the creation process which involed a lot sketching, extruding, and aligning.

![Fusion Finish](/assets/images/RemixingProject/FusionFinish.png)

## A Test Print

To test the tolerances and make sure everything aligned and fit I printed a single component and the tailboard (I will show Slicer settings momentairly). Here is the result and you can see that everything fits allbeit a bit loose. 

![Test Print](/assets/images/RemixingProject/FusionTestPrintSideTop.jpg)

## Final Print