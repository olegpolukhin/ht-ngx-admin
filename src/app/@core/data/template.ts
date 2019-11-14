import {DateRange} from '../../components/app-daterange-picker/app-daterange-picker.component';

export interface ParamTemplate {
    Template: string;
    DateRange?: DateRange;
}

export interface ParamTemplateMetric {
    Metric: string;
    DateRange?: DateRange;
}
