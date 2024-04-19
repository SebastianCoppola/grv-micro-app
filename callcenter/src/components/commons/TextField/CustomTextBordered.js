import CustomText from "./CustomText";
import { FormHelperText } from "@material-ui/core";

const CustomTextBordered = (props) => {
  const { titulo, value, inputRef, onChange } = props;
  return (
    <>
      <FormHelperText>{titulo}</FormHelperText>
      <CustomText
        inputRef={inputRef}
        variant={"outlined"}
        fullwidth={true}
        borderRadius={"20px"}
        shrink={true}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default CustomTextBordered;
