import { NumericFormat } from "react-number-format";

interface MoneyFormatProps {
  value: number;
}

function MoneyFormat(props: MoneyFormatProps) {
  const { value } = props;

  return (
    <NumericFormat
      value={value}
      displayType={"text"}
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={"$"}
      renderText={(value) => <text>{value}</text>}
    />
  );
}

export default MoneyFormat;
