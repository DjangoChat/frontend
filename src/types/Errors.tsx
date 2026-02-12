export type SimpleErrorItem = {
  attr: string
  code: string
  detail: string
}

export type CompleteErrorItem = {
  attr: null
  code: string
  detail: string
}

export type SimpleError = {
  errors: SimpleErrorItem[]
}

export type CompleteError = {
  errors: CompleteErrorItem[]
  type: string
}
