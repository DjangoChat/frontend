import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link as JoyLink,
  Stack,
  Typography,
} from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Link, useNavigate } from "react-router"
import { GoogleIcon } from "../../../components"
import { ROUTES_KEYS } from "../../../constants"
import {
  clearRegister,
  setPassword1,
  setPassword2,
  setPhone,
  setRegisterEmail,
  useAppDispatch,
  useAppSelector,
  useRegisterMutation,
  validateRegister,
} from "../../../redux"
import { AuthFooter, AuthHeader, AuthLayout } from "../components"

export function RegisterPage() {
  const content = useIntlayer("register")
  const { appName } = useIntlayer("topbar")

  const dispatch = useAppDispatch()
  const { email, phone, password1, password2, errors } = useAppSelector(
    state => state.register,
  )
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(validateRegister())

    const hasErrors = Object.values(errors).some(Boolean)
    if (
      hasErrors ||
      !email.trim() ||
      !phone.trim() ||
      !password1.trim() ||
      !password2.trim()
    )
      return

    register({
      email: email.trim(),
      phone: phone.trim(),
      password1,
      password2,
    })
      .unwrap()
      .then(() => {
        dispatch(clearRegister())
        void navigate(ROUTES_KEYS.REGISTER_SUCCESS)
      })
      .catch(() => undefined)
  }

  return (
    <AuthLayout
      backgroundImage="https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2"
      darkBackgroundImage="https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          width: "100%",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <AuthHeader appName={appName as string} />

        <Box
          component="main"
          sx={{
            my: "auto",
            py: 2,
            pb: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", sm: 400 },
            maxWidth: "100%",
            mx: "auto",
            borderRadius: "sm",
            "& form": {
              display: "flex",
              flexDirection: "column",
              gap: 2,
            },
            "& .MuiFormLabel-asterisk": {
              visibility: "hidden",
            },
          }}
        >
          <Stack sx={{ gap: 4, mb: 2 }}>
            <Stack sx={{ gap: 1 }}>
              <Typography component="h1" level="h3">
                {content.title as string}
              </Typography>
              <Typography level="body-sm">
                {content.alreadyHaveAccount as string}{" "}
                <JoyLink
                  component={Link}
                  to={ROUTES_KEYS.LOGIN}
                  level="title-sm"
                >
                  {content.signInLink as string}
                </JoyLink>
              </Typography>
            </Stack>
            <Button
              variant="soft"
              color="neutral"
              fullWidth
              startDecorator={<GoogleIcon />}
            >
              {content.continueWithGoogle as string}
            </Button>
          </Stack>

          <Divider
            sx={theme => ({
              [theme.getColorSchemeSelector("light")]: {
                color: { xs: "#FFF", md: "text.tertiary" },
              },
            })}
          >
            {content.or as string}
          </Divider>

          <Stack sx={{ gap: 4, mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <FormControl required error={!!errors.email}>
                <FormLabel>{content.emailLabel as string}</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => dispatch(setRegisterEmail(e.target.value))}
                />
                {errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>
              <FormControl required error={!!errors.phone}>
                <FormLabel>{content.phoneLabel as string}</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={e => dispatch(setPhone(e.target.value))}
                />
                {errors.phone && (
                  <FormHelperText>{errors.phone}</FormHelperText>
                )}
              </FormControl>
              <FormControl required error={!!errors.password1}>
                <FormLabel>{content.passwordLabel as string}</FormLabel>
                <Input
                  type="password"
                  name="password1"
                  value={password1}
                  onChange={e => dispatch(setPassword1(e.target.value))}
                />
                {errors.password1 && (
                  <FormHelperText>{errors.password1}</FormHelperText>
                )}
              </FormControl>
              <FormControl required error={!!errors.password2}>
                <FormLabel>{content.confirmPasswordLabel as string}</FormLabel>
                <Input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={e => dispatch(setPassword2(e.target.value))}
                />
                {errors.password2 && (
                  <FormHelperText>{errors.password2}</FormHelperText>
                )}
              </FormControl>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  sx={{
                    bgcolor: "#25D366",
                    "&:hover": {
                      bgcolor: "#128C7E",
                    },
                  }}
                >
                  {content.signUpButton as string}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>

        <AuthFooter copyright={content.copyright as string} />
      </Box>
    </AuthLayout>
  )
}
