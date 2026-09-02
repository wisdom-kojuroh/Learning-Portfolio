import time
import easyocr


def benchmark_ocr(image_path):
    """
    Run OCR on a single image and measure processing time.
    """

    print("=" * 50)
    print(f"Image : {image_path}")
    print("=" * 50)

    reader = easyocr.Reader(
        ['en'],
        gpu=False
    )

    start = time.perf_counter()

    results = reader.readtext(image_path)

    end = time.perf_counter()

    elapsed = end - start

    print(f"\nOCR Time : {elapsed:.3f} seconds")
    print(f"Detected : {len(results)} text region(s)\n")

    print("Recognized Text")
    print("-" * 50)

    if len(results) == 0:
        print("No text detected.")
    else:
        for i, result in enumerate(results, start=1):
            text = result[1]
            confidence = result[2]

            print(f"[{i}] {text}")
            print(f"    Confidence : {confidence:.3f}")

    print()


if __name__ == "__main__":

    image_path = r"C:\dev\VGLL\assets\original\ff5_dialogue_01.png"

    benchmark_ocr(image_path)