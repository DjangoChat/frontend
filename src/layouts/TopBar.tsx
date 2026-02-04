import { Language as LanguageIcon } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy"
import { getLocalizedUrl, type LocalesValues } from "intlayer"
import { useIntlayer, useLocale } from "react-intlayer"
import { Link, useLocation, useNavigate } from "react-router"
import { ThemeToggleButton } from "../components"
import { LANGUAGES, ROUTES_KEYS } from "../constants"

export const TopBar = () => {
  const { setLocale, locale } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { appName, login, signUp, languageSelector } = useIntlayer("topbar")

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.surface",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2 }}
        >
          {/* Logo */}
          <Link
            to={ROUTES_KEYS.ROOT}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography level="h4" fontWeight="bold" sx={{ color: "#25D366" }}>
              {appName as unknown as string}
            </Typography>
          </Link>

          {/* Navigation and Controls */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Login Button */}
            <Button
              component={Link}
              to={ROUTES_KEYS.LOGIN}
              variant="plain"
              color="neutral"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {login as unknown as string}
            </Button>

            {/* Sign Up Button */}
            <Button
              component={Link}
              to={ROUTES_KEYS.SIGNUP}
              variant="solid"
              sx={{
                bgcolor: "#25D366",
                "&:hover": {
                  bgcolor: "#128C7E",
                },
                display: { xs: "none", sm: "flex" },
              }}
            >
              {signUp as unknown as string}
            </Button>

            {/* Language Selector */}
            <Select
              value={locale}
              onChange={(_, value) => {
                if (value) {
                  const newLocale = value as LocalesValues
                  const newUrl = getLocalizedUrl(location.pathname, newLocale)
                  setLocale(newLocale)
                  void navigate(newUrl)
                }
              }}
              size="sm"
              variant="outlined"
              startDecorator={<LanguageIcon />}
              sx={{ minWidth: 100 }}
              slotProps={{
                button: {
                  sx: {
                    borderRadius: "sm",
                  },
                },
              }}
            >
              <Option value={LANGUAGES.EN}>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {languageSelector.english as unknown as string}
              </Option>
              <Option value={LANGUAGES.ES}>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {languageSelector.spanish as unknown as string}
              </Option>
            </Select>

            {/* Theme Toggle */}
            <ThemeToggleButton />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
