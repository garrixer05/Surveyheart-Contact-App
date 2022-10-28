// alert('hello');


function update () {
  document.querySelector('.editForm').addEventListener('submit',async function (e) {
    let newName = document.querySelectorAll('.editForm input')[0].value
    let newEmail = document.querySelectorAll('.editForm input')[1].value
    let newNumber = document.querySelectorAll('.editForm input')[2].value
    let path = window.location.pathname;
    e.preventDefault()
    try {
      await axios.put(path, {
            name:newName,
            email:newEmail,
            number:newNumber
          });
    } catch (e) {
      if(e){
        console.log(e);
      }

    }

  });
}



function editCreate (s) {

  if (s === 'e') {
    document.getElementById('edit').addEventListener('click',
      function () {
        let m = document.querySelectorAll('.eContent h4');
        document.querySelectorAll('.editForm input')[0].value = m[0].textContent.slice(7, m[0].length)
        document.querySelectorAll('.editForm input')[1].value = m[1].textContent.slice(8, m[1].length)
        document.querySelectorAll('.editForm input')[2].value = m[2].textContent.slice(13, m[2].length)

        document.getElementById('bg-modal-2').style.display = 'flex';
        // document.querySelector('.eContent ')
      }
    );

  } else {
    document.getElementById('create').addEventListener('click',
      function () {
        document.querySelector('.bg-modal').style.display = 'flex';
      }
    );
    document.querySelector('.close').addEventListener('click', function () {
      document.querySelector('.bg-modal').style.display = 'none';
    });
  }
  document.querySelector('#bg-modal-2 .close').addEventListener('click', function () {
    document.getElementById('bg-modal-2').style.display = 'none';
  });
}

function deleteDoc() {
  let url = window.location.href.split('/')
  // let contact = url
  let _id = url[url.length - 1]
  fetch(`/api/v1/:contact/${_id}`,{
      method:'DELETE'
  })
}
