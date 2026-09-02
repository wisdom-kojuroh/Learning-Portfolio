import cv2
import os


def crop_roi(input_path, output_path):
    # Load image
    image = cv2.imread(input_path)

    if image is None:
        print(f"Failed to load image: {input_path}")
        return

    # Select ROI
    roi = cv2.selectROI(
        "Select ROI",
        image,
        showCrosshair=True,
        fromCenter=False
    )

    x, y, w, h = roi

    # Cancel check
    if w == 0 or h == 0:
        print("ROI selection cancelled.")
        cv2.destroyAllWindows()
        return

    # Crop image
    cropped = image[y:y+h, x:x+w]

    # Save result
    cv2.imwrite(output_path, cropped)

    print("ROI saved:")
    print(output_path)

    cv2.destroyAllWindows()


if __name__ == "__main__":

    input_image = r"C:\dev\VGLL\assets\original\ff5_dialogue_01.png"
    output_image = r"C:\dev\VGLL\assets\roi\ff5_dialogue_01.png"

    crop_roi(input_image, output_image)