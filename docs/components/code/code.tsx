const Code = ({ className, ...props }) => (
  <div
    className={`c-code p-4 border  border-gray-200 dark:border-gray-700 mt-6 rounded-t-lg ${className}`}
    {...props}
  />
);

export default Code;
