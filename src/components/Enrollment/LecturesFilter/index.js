import React from "react";

import IntlMessages from "util/IntlMessages";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

const LecturesFilter = props => {
  const { textFilter, dateFilter, areaFilter, areasList } = props.fields;
  const { handleChange } = props;
  return (
    <div className="d-flex flex-column align-items-start justify-content-start">
      <TextField
        label={<IntlMessages id="pages.enrollment.filter.text" />}
        fullWidth
        onChange={handleChange("textFilter")}
        value={textFilter}
        margin="normal"
        className="mt-1 my-sm-3"
      />
      <FormControl component="fieldset">
        <RadioGroup
          className="d-flex flex-row"
          value={dateFilter}
          onChange={handleChange("dateFilter")}
        >
          <FormControlLabel
            label={<IntlMessages id="pages.enrollment.filter.firstDay" />}
            value="05"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="06"
            control={<Radio color="primary" />}
            label={<IntlMessages id="pages.enrollment.filter.secondDay" />}
          />
          <FormControlLabel
            value=""
            control={<Radio color="primary" />}
            label={<IntlMessages id="pages.enrollment.filter.allDates" />}
          />
        </RadioGroup>
      </FormControl>
      <FormControl className="w-100 mb-2">
        <InputLabel>
          <IntlMessages id="pages.enrollment.filter.area" />
        </InputLabel>
        <Select
          className="mb-3"
          value={areaFilter}
          onChange={handleChange("areaFilter")}
        >
          <MenuItem key={0} value="">
            Todos
          </MenuItem>
          {areasList.map(area => (
            <MenuItem key={area.id} value={area.name}>
              {area.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LecturesFilter;
