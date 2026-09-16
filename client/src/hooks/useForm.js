import { useState } from "react";

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues)
    function changeHandler(e) {
       setValues(state => ({
        ...state,
        [e.target.name] : e.target.value
       }))
    }
    function register (name) {
    return {
        name,
        value: values[name],
        onChange: changeHandler
    }
    }
    return {
        values,
        register
    }
}