import {DateRange} from '../../components/app-daterange-picker/app-daterange-picker.component';

export interface ParamNetwork {
    Network: string;
    DateRange?: DateRange;
}

export interface ParamMetric {
    Metric: string;
    DateRange?: DateRange;
}
