function updatePost() {
    const modal = document.querySelector('.modal-mask'),
          btnShowModal = document.querySelectorAll('.update-post'),
          btnClose = document.querySelector('.btn-close');
    
    btnShowModal.forEach(btn => {
        btn.addEventListener('click', (e) => {
            modal.style.display = 'flex';

            const form = modal.querySelector('form');
            const id = e.target.getAttribute('data-id');

            form.elements[0].setAttribute('name', 'id'); // post запрос id изменяемой записи
            form.elements[0].setAttribute('value', id); // value id изменяемой записи

            console.log(form.elements[0]);
            form.setAttribute('action', '/update');
        });
    });

    btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
updatePost();