package core

type ColombiaPublicError struct {
	IsColombiaPublicError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewColombiaPublicError(code string, msg string, ctx *Context) *ColombiaPublicError {
	return &ColombiaPublicError{
		IsColombiaPublicError: true,
		Sdk:              "ColombiaPublic",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ColombiaPublicError) Error() string {
	return e.Msg
}
