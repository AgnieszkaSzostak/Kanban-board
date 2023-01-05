const validateForm = (e, form) => {
    e.preventDefault();

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
    return errors
}
export default validateForm
