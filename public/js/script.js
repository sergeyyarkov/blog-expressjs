function updatePost() {
    const modal = document.querySelector('.modal-update'),
          btnShowModal = document.querySelectorAll('.update-post'),
          btnClose = modal.querySelector('.btn-close'),
          form = modal.querySelector('form');
    
    btnShowModal.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnSend = modal.querySelector('.btn-send');
                  id = e.target.getAttribute('data-id'),
                  idInput = modal.querySelector('#id');

            idInput.setAttribute('name', 'id'); // post запрос id изменяемой записи
            idInput.setAttribute('value', id); // value id изменяемой записи
            modal.style.display = 'flex'; // показать модальное окно

            btnSend.addEventListener('click', (e) => {
                let idInputValue = idInput.value;

                if (!isNaN(idInputValue) == false) {
                    alert('Поле ID должен быть числом!');
                    e.preventDefault();           
                } else {
                    idInputValue = idInputValue.trim();
                }
            });
        });
    });

    // закрыть модалку
    btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 1; i < 4; i++) {
            form.elements[i].value = '';
        }
        modal.style.display = 'none';
    });
}

function addPost() {
    const modal = document.querySelector('.modal-add'),
          btnShowModal = document.querySelector('.post-block_add'),
          btnClose = modal.querySelector('.btn-close');

    btnShowModal.addEventListener('click', () => {
        modal.style.display = 'flex'; // показать модальное окно

        // закрыть модалку
        btnClose.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'none';
        });
    });
}
addPost();
updatePost();