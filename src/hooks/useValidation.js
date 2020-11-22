import {useEffect, useState} from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const [minLength, setMinLength] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isInputValid, setIsInputValid] = useState(false)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLength(true) : setMinLength(false)
          setErrorText('Слишком короткий')
          break;
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break;
        case 'isEmail':
          const reg = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
          reg.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true)
          setErrorText('Некорректный e-mail')
          break;
      }
    }

  }, [value])

  useEffect(() => {
    if (isEmpty || minLength || isEmail) {
      setIsInputValid(false)
    } else {
      setIsInputValid(true)
    }

  }, [isEmpty, minLength, isEmail])

  return {
    isEmpty,
    minLength,
    isEmail,
    isInputValid,
    errorText
  }

}

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isInInput, setIsInInput] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    setIsInInput(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isInInput,
    ...valid
  }
}

export default useInput

