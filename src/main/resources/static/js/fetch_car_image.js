const image_input = document.getElementById('car_image');
const getCarImage = async (id) => {
    const response = await fetch(`/vehicle/image/${id}`);
    const response_image = await response.blob();
    const file = new File([response_image], 'car_image.jpg', {type: 'image/jpg'});
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    image_input.files = dataTransfer.files;
}
document.addEventListener('DOMContentLoaded', (event) => {
    let car_id = document.getElementById('car_id').value;
    getCarImage(car_id);
})