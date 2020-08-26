	@cds.persistence.exists
entity PIPELIFE {
  key ITEM_ID     : Integer64            @(title: '{i18n>IDTaksi}');
  NOM_DIAM_DN     : Decimal(15,2)        @(title: '{i18n>Vards}');
  OUT_DIAM_DOUT   : Decimal(15,2)        @(title: '{i18n>Uzvards}');
  INN_DIAM_DIN    : Decimal(15,2)        @(title: '{i18n>NmrKods}');
  R_HEIGTH_H      : Decimal(15,2)        @(title: '{i18n>PersKodsAtd}');
  R_LENGTH_L      : Decimal(15,2)        @(title: '{i18n>VATnumber}');
  WEIGHT          : Decimal(15,2)        @(title: '{i18n>NmrKods}');
  PIPE_LENGTH     : Decimal(15,2)        @(title: '{i18n>NmrKods}');
  SOCKET_LENGTH   : Decimal(15,2)        @(title: '{i18n>NmrKods}');
  INN_SOCKET_DIAM : Decimal(15,2)        @(title: '{i18n>NmrKods}');
  PROD_CODE       : hana.VARCHAR(100)    @(title: '{i18n>NmrKods}');
  CATEGORY        : hana.VARCHAR(100)    @(title: '{i18n>NmrKods}');
}
