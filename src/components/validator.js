const validateForm = (e, form) => {
    e.preventDefault();
    const {taskName, projectStage, user} = form.elements;
    let errors = null;
    const fields = [
        {
            name: 'taskName',
            required: true,
            pattern: '^[a-zA-Z –-]+$'
        },
        {
            name: 'projectStage',
            required: true,
        },
        {
            name: 'user',
            required: true,
            pattern: '^[a-zA-Z –-]+$'
        }
    ]
    fields.forEach(field => {
        const {name, required = false, pattern = null} = field;
        const {value} = form[name]
        if(required){
            if(value.length === 0){
                errors = {
                    ...errors,
                    [name]: 'Field is empty'
                }
            }else if(pattern){
                const reg = new RegExp(pattern);
                if(!reg.test(value)){
                    errors = {
                        ...errors,
                        [name]: 'Field is invalid'
                    }
                }
            }
        }
    })
    const formObj = {
        task: {
            name: taskName.value,
            idColumn: projectStage.value,
            user: user.value,
        },
        errors
    } 
    return formObj
}
export default validateForm
