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
import { Link } from "react-router"
import { ThemeToggleButton } from "../components"
import { LANGUAGES, ROUTES_KEYS } from "../constants"
import { useLanguage } from "../hooks"

export const TopBar = () => {
  const { language, setLanguage } = useLanguage()

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
              ChatApp
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
              Login
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
              Sign Up
            </Button>

            {/* Language Selector */}
            <Select
              value={language}
              // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
              onChange={(_, value) => value && setLanguage(value)}
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
              <Option value={LANGUAGES.EN}>English</Option>
              <Option value={LANGUAGES.ES}>Español</Option>
            </Select>

            {/* Theme Toggle */}
            <ThemeToggleButton />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
