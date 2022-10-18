const configRequest = (formData) => {
    const config = {
        url: '/api/savedata',
        options: {
            method: "POST",
            body: formData
        }
    }
    return { config }
}

const makeSelectorPage = async () => {
    const pageElement = document.getElementById('selectorPage')
    return { pageElement }
}

const getDataForm = () => {
    const myForm = document.querySelector("#my-form")
    const formData = new FormData(myForm)

    return { myForm, formData }
}

const handlerRequest = async (url, options, form) => {
    try {
        const resp = await fetch(url, options);
        const jsonToRead = await resp.json();
        const dataToRead = await JSON.stringify(jsonToRead);
        form.reset();
        return { dataToRead }
    } catch (error) {
        console.log(error)
    }
}

document.myform.onsubmit = async e => {
    e.preventDefault()
    const { myForm, formData } = getDataForm();
    const { config } = await configRequest(formData);

    const { dataToRead } = await handlerRequest(config.url, config.options, myForm)
    const { pageElement } = await makeSelectorPage();
    pageElement.focus()
    return await alert(dataToRead)
}
