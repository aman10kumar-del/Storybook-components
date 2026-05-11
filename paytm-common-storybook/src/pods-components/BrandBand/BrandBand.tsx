import React from "react";

import s from "./BrandBand.module.scss";

const BrandBand: React.FC<{}> = () => {
	return (
		<div
			data-testid="brand-band-container"
			className={s.brandBandContainer}
		>
			<div data-testid="primary-band" className={s.primaryBand} />
			<div data-testid="secondary-band" className={s.secondaryBand} />
		</div>
	);
};

export default BrandBand;
