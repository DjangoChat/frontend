import {
  Box,
  Button,
  Checkbox,
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
import { ROUTES_KEYS } from "../../../constants"
import {
  clear,
  setEmail,
  setPassword,
  useAppDispatch,
  useAppSelector,
  useLoginMutation,
  validate,
} from "../../../redux"
import { AuthFooter, AuthHeader, AuthLayout } from "../components"
import { GoogleIcon } from "../../../components"

export function SignInPage() {
  const content = useIntlayer("signin")
  const { appName } = useIntlayer("topbar")

  const dispatch = useAppDispatch()
  const { email, password, errors } = useAppSelector(state => state.signin)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(validate())

    const hasErrors = Object.values(errors).some(Boolean)
    if (hasErrors || !email.trim() || !password.trim()) return

    void login({ email: email.trim(), password })
      .then(() => (dispatch(clear()), navigate(ROUTES_KEYS.DASHBOARD)))
      .catch(() => dispatch(clear()))
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
          px: 2,
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
            width: 400,
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
                {content.newToApp as string}{" "}
                <JoyLink
                  component={Link}
                  to={ROUTES_KEYS.REGISTER}
                  level="title-sm"
                >
                  {content.signUpLink as string}
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
                  onChange={e => dispatch(setEmail(e.target.value))}
                />
                {errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>
              <FormControl required error={!!errors.password}>
                <FormLabel>{content.passwordLabel as string}</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => dispatch(setPassword(e.target.value))}
                />
                {errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    size="sm"
                    label={content.rememberMe as string}
                    name="persistent"
                  />
                  <JoyLink level="title-sm" href="#">
                    {content.forgotPassword as string}
                  </JoyLink>
                </Box>
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
                  {content.signInButton as string}
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
