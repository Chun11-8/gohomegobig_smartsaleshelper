import os
import cv2
from ultralytics import YOLO


def detectObject():
    # Load the YOLOv8 model
    model = YOLO('/modal/best.pt')
    print("Model Loaded")
    # Perform inference on an image
    results = model('/uploads/download(3).jpg')

    # Load the original image
    #image = '/content/drive/MyDrive/Data/custom_object_detection/output/yolov8n_v8_50e_inferootd/download(10).jpg'
    #img = cv2.imread(image)

    path = '/cropped/'
    # Extract bounding boxes
    boxes = results[0].boxes.xyxy.tolist()

    # Iterate through the bounding boxes
    for i, box in enumerate(boxes):
        x1, y1, x2, y2 = box
        # Crop the object using the bounding box coordinates
        ultralytics_crop_object = img[int(y1):int(y2), int(x1):int(x2)]
        print("Image" + str(i))
        bigger = cv2.resize(ultralytics_crop_object, (240, 240))
        #cv2_imshow(bigger)

        #Save crop image
        print("Successfully Saved to directory")
        cv2.imwrite(path+ 'ultralytics_crop_' + str(i) + '.jpg', ultralytics_crop_object)
