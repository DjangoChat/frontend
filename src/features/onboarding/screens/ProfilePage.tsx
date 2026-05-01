import { Edit } from "@mui/icons-material"
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy"
import { useState } from "react"
import { useIntlayer } from "react-intlayer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { ROUTES_KEYS } from "../../../constants"
import type { RootState } from "../../../redux"
import {
  setBirthDate,
  setCustomGender,
  setFirstName,
  setGender,
  setLastName,
  setNickname,
  useAddProfileMutation,
} from "../../../redux"

export const ProfilePage = () => {
  const {
    personalInfo,
    personalInfoDescription,
    nickname,
    firstName,
    lastName,
    gender,
    customGender,
    birthDate,
    male,
    female,
    other,
    custom,
    save,
    cancel,
    saving: savingLabel,
  } = useIntlayer("profile")

  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addProfile, { isLoading: isSaving }] = useAddProfileMutation()
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    addProfile({
      nickname: profile.nickname ?? "",
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      gender: profile.gender ?? "",
      custom_gender: profile.custom_gender ?? "",
      birth_date: profile.birth_date ?? new Date(),
    })
      .unwrap()
      .then(() => {
        void navigate(ROUTES_KEYS.ONBOARDING)
      })
      .catch(() => {
        console.log("error")
      })
  }

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      {/* Main Content */}
      <Stack
        spacing={3}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 0, md: 0 },
          py: { xs: 0, md: 0 },
        }}
      >
        {/* Personal Info Card */}
        <Card>
          <Box sx={{ mb: 2 }}>
            <Typography level="title-md">{personalInfo as string}</Typography>
            <Typography level="body-sm">
              {personalInfoDescription as string}
            </Typography>
          </Box>
          <Divider />

          {/* Desktop View */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 2 }}
          >
            {/* Avatar Section */}
            <Stack direction="column" spacing={1} sx={{ position: "relative" }}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{
                  flex: 1,
                  minWidth: 120,
                  borderRadius: "100%",
                  bgcolor: "neutral.softBg",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {previewAvatar ? (
                  <img src={previewAvatar} alt="Profile avatar" />
                ) : (
                  <Box
                    sx={{
                      fontSize: "3rem",
                      color: "neutral.plainColor",
                    }}
                  >
                    👤
                  </Box>
                )}
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                component="label"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <Edit />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
            </Stack>

            {/* Form Fields */}
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* Nickname and Name */}
              <Stack spacing={1}>
                <FormLabel>{nickname as string}</FormLabel>
                <Input
                  size="sm"
                  placeholder="Nickname"
                  value={profile.nickname ?? ""}
                  onChange={e => dispatch(setNickname(e.target.value))}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>{firstName as string}</FormLabel>
                  <Input
                    size="sm"
                    placeholder="First name"
                    value={profile.first_name ?? ""}
                    onChange={e => dispatch(setFirstName(e.target.value))}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>{lastName as string}</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Last name"
                    value={profile.last_name ?? ""}
                    onChange={e => dispatch(setLastName(e.target.value))}
                  />
                </FormControl>
              </Stack>

              {/* Gender */}
              <FormControl>
                <FormLabel>{gender as string}</FormLabel>
                <Select
                  size="sm"
                  value={profile.gender ?? ""}
                  onChange={(_, value) => {
                    if (value) {
                      dispatch(setGender(value))
                    }
                  }}
                >
                  <Option value="">{gender as string}</Option>
                  <Option value="male">{male as string}</Option>
                  <Option value="female">{female as string}</Option>
                  <Option value="other">{other as string}</Option>
                  <Option value="custom">{custom as string}</Option>
                </Select>
              </FormControl>

              {/* Custom Gender (if selected) */}
              {profile.gender === "custom" && (
                <FormControl>
                  <FormLabel>{customGender as string}</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Specify your gender"
                    value={profile.custom_gender ?? ""}
                    onChange={e => dispatch(setCustomGender(e.target.value))}
                  />
                </FormControl>
              )}

              {/* Birth Date */}
              <FormControl>
                <FormLabel>{birthDate as string}</FormLabel>
                <Input
                  size="sm"
                  type="date"
                  value={
                    profile.birth_date
                      ? profile.birth_date.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={e => {
                    if (e.target.value) {
                      dispatch(setBirthDate(new Date(e.target.value)))
                    }
                  }}
                />
              </FormControl>
            </Stack>
          </Stack>

          {/* Mobile View */}
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 2 }}
          >
            {/* Avatar Section Mobile */}
            <Stack direction="row" spacing={2} sx={{ position: "relative" }}>
              <AspectRatio
                ratio="1"
                maxHeight={108}
                sx={{
                  flex: 1,
                  minWidth: 108,
                  borderRadius: "100%",
                  bgcolor: "neutral.softBg",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {previewAvatar ? (
                  <img src={previewAvatar} alt="Profile avatar" />
                ) : (
                  <Box
                    sx={{
                      fontSize: "2rem",
                      color: "neutral.plainColor",
                    }}
                  >
                    👤
                  </Box>
                )}
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                component="label"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 85,
                  top: 70,
                  boxShadow: "sm",
                }}
              >
                <Edit />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
            </Stack>

            {/* Form Fields Mobile */}
            <FormControl>
              <FormLabel>{nickname as string}</FormLabel>
              <Input
                size="sm"
                placeholder="Nickname"
                value={profile.nickname ?? ""}
                onChange={e => dispatch(setNickname(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{firstName as string}</FormLabel>
              <Input
                size="sm"
                placeholder="First name"
                value={profile.first_name ?? ""}
                onChange={e => dispatch(setFirstName(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{lastName as string}</FormLabel>
              <Input
                size="sm"
                placeholder="Last name"
                value={profile.last_name ?? ""}
                onChange={e => dispatch(setLastName(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{gender as string}</FormLabel>
              <Select
                size="sm"
                value={profile.gender ?? ""}
                onChange={(_, value) => {
                  if (value) {
                    dispatch(setGender(value))
                  }
                }}
              >
                <Option value="">{gender as string}</Option>
                <Option value="male">{male as string}</Option>
                <Option value="female">{female as string}</Option>
                <Option value="other">{other as string}</Option>
                <Option value="custom">{custom as string}</Option>
              </Select>
            </FormControl>

            {profile.gender === "custom" && (
              <FormControl>
                <FormLabel>{customGender as string}</FormLabel>
                <Input
                  size="sm"
                  placeholder="Specify your gender"
                  value={profile.custom_gender ?? ""}
                  onChange={e => dispatch(setCustomGender(e.target.value))}
                />
              </FormControl>
            )}

            <FormControl>
              <FormLabel>{birthDate as string}</FormLabel>
              <Input
                size="sm"
                type="date"
                value={
                  profile.birth_date
                    ? profile.birth_date.toISOString().split("T")[0]
                    : ""
                }
                onChange={e => {
                  if (e.target.value) {
                    dispatch(setBirthDate(new Date(e.target.value)))
                  }
                }}
              />
            </FormControl>
          </Stack>

          {/* Action Buttons */}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => {
                  setPreviewAvatar(null)
                }}
              >
                {cancel as string}
              </Button>
              <Button
                size="sm"
                variant="solid"
                onClick={handleSave}
                loading={isSaving}
              >
                {isSaving ? (savingLabel as string) : (save as string)}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  )
}
