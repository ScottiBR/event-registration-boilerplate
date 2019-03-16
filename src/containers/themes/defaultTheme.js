import red from "@material-ui/core/colors/red";
//import green from "@material-ui/core/colors/green";
import cyan from "@material-ui/core/colors/cyan";
export default {
  palette: {
    primary: {
      light: red[200],
      main: red[400],
      dark: red[700],
      contrastText: "#fff"
    },
    secondary: {
      light: cyan[700],
      main: cyan[900],
      dark: cyan[900],
      contrastText: "#fff"
    }
  },
  status: {
    danger: "orange"
  },
  typography: {
    button: {
      fontWeight: 400,
      textAlign: "capitalize"
    }
  }
};
/* secondary: {
      light: green[500],
      main: green[700],
      dark: green[900],
      contrastText: "#fff"
    }
       secondary: {
      light: red[400],
      main: red[500],
      dark: red[700],
      contrastText: "#fff"
    }
     secondary: {
      light: indigo[300],
      main: indigo["A200"],
      dark: indigo[700],
      contrastText: "#fff"
    }
    */
