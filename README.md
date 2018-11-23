# Photo Editor

Be able to select an image and manipulate it with various 'filters'.

### Install

Insert `index.html` with path in to the browser to run.

#### Current features

Selecting an image to load, invert image, change brightness, change contrast and reset image.

Image keeps the same


#### Still to be added

- Save image button (although you can save the changed image from the browser)

- More filters such as increase red, green or blue etc

- Refactor, currently I had the original image side by side with the one you can edit. I decided I only wanted the image to edit displayed. I have temporarily hidden it but need to change the code so that it is loaded but not 'displayed'

- Layers, adding multiple canvas layers to further manipulate the image

- Drawing on the image


### Testing

Testing using cypress.io. There is only a test to confirm the loading and displaying of an image.

`npm install`

Run test:

`npm test`
