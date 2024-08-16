import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Certificate = (props) => (
    <Svg
        width={17}
        height={17}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.78.034C5.057.317 2.735 2.186 1.894 4.77a6.885 6.885 0 0 0-.075 3.926c.145.532.47 1.273.747 1.7a.83.83 0 0 1 .112.216c-.001.023-.605.909-1.342 1.97A182.248 182.248 0 0 0 0 14.516c.003.004.692-.12 1.533-.275.84-.155 1.538-.27 1.55-.256.013.015.149.692.301 1.506.153.814.283 1.486.29 1.493.018.018-.142.245 1.29-1.826l1.26-1.818a4.42 4.42 0 0 1 .342.093c.687.202 1.025.245 1.934.245.71 0 .878-.01 1.212-.074a8.72 8.72 0 0 0 1.008-.255c.037-.013.385.464 1.29 1.77.68.982 1.25 1.808 1.267 1.835.017.026.037.04.046.032.008-.008.14-.681.292-1.495.152-.814.288-1.492.301-1.506.014-.015.712.1 1.552.254.84.155 1.53.28 1.532.277.002-.003-.599-.874-1.336-1.934-.738-1.061-1.341-1.947-1.342-1.97 0-.022.05-.12.112-.216.309-.477.612-1.192.778-1.835.796-3.082-.627-6.26-3.482-7.774-1.138-.603-2.64-.89-3.95-.753Zm1.737 1.058c2.889.49 5.007 3.067 4.893 5.954-.059 1.504-.619 2.802-1.668 3.869-1.154 1.172-2.61 1.782-4.26 1.782a5.847 5.847 0 0 1-4.148-1.702A5.787 5.787 0 0 1 2.88 5.009c.142-.427.53-1.18.79-1.538C4.675 2.092 6.183 1.224 7.91 1.03c.39-.044 1.15-.014 1.607.063Zm-.201 5.23L7.255 8.36l-.824-.814-.825-.815-.353.35-.353.348L6.086 8.6l1.186 1.172 2.414-2.386L12.1 5l-.362-.357-.362-.356-2.06 2.036ZM3.688 11.78a7.35 7.35 0 0 0 1.3.978c.154.086.276.17.272.184-.024.077-1.02 1.479-1.037 1.46a11.327 11.327 0 0 1-.167-.813c-.115-.618-.158-.79-.197-.79-.044 0-1.39.242-1.56.28-.034.008-.056-.002-.05-.021a46.764 46.764 0 0 1 1.099-1.588c.007 0 .16.139.34.31Zm10.513.466c.295.427.542.792.549.812.007.019-.015.028-.049.02-.15-.036-1.506-.28-1.556-.28-.045 0-.08.139-.201.79-.08.435-.156.8-.167.813-.018.02-1.014-1.382-1.037-1.459-.005-.015.121-.1.28-.189.409-.23.894-.596 1.28-.964a5.21 5.21 0 0 1 .348-.318c.009 0 .258.348.553.775Z"
            fill="#8774FE"
        />
    </Svg>
);

export default Certificate;
