export type CheckOutSessionRequest = {
  success_url: string
  cancel_url: string
  stripe_price_id: string
}

export type CheckOutSessionResponse = {
  checkout_session_id: string
}
