import enLang from "./entries/en-US";
import ptLang from "./entries/pt_BR";
import { addLocaleData } from "react-intl";

const AppLocale = {
  en: enLang,
  pt: ptLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.pt.data);
export default AppLocale;
