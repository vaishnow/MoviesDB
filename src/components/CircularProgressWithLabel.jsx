import { Box, CircularProgress, Typography } from "@mui/material";

function CircularProgressWithLabel(props) {
  const getColor = (val) => {
    if (val < 40) return "error";
    if (val < 70) return "warning";
    return "success";
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        color={getColor(props.value)}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
		  fontWeight="900"
          className="dark:text-white"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
