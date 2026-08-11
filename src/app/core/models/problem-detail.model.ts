// Corpo application/problem+json restituito da P-SRV (Solution Design, capitolo 7.2).

export interface FieldErrorDto {
  field: string;
  code: string;
  message: string;
}

export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  code: string;
  detail: string;
  correlationId: string;
  errors: FieldErrorDto[];
}
