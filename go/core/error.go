package core

type ZippopotamusZipCodeError struct {
	IsZippopotamusZipCodeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewZippopotamusZipCodeError(code string, msg string, ctx *Context) *ZippopotamusZipCodeError {
	return &ZippopotamusZipCodeError{
		IsZippopotamusZipCodeError: true,
		Sdk:              "ZippopotamusZipCode",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ZippopotamusZipCodeError) Error() string {
	return e.Msg
}
