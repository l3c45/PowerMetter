# 1 "c:\\Users\\PC\\Desktop\\PoweMetter\\arduino\\main.ino\\main.ino.ino"
# 2 "c:\\Users\\PC\\Desktop\\PoweMetter\\arduino\\main.ino\\main.ino.ino" 2

// Parametros de lcd: (rs, enable, d4, d5, d6, d7)
LiquidCrystal lcd(9, 8, 5, 4, 3, 2);

 int DELAY_LOOP=2000;
unsigned int randomNumber;
unsigned int currentNumber;
unsigned int tempNumber;
char buffer[10];


void setup() {

  randomSeed(analogRead(0));

  Serial.begin(9600);
  //16 columnas ,2 filas
  lcd.begin(16, 2);

}

void loop() {

  randomNumber=random(200,225);
  currentNumber=random(12,16);
  tempNumber=random(28,31);
  // Envia informacion a puerto serial

  sprintf(buffer, "%u,%u,%u", randomNumber, currentNumber,tempNumber);
  Serial.println(buffer);



  // Imprime valores en lcd
  lcd.print("Tension de red:");
  lcd.setCursor(6, 1);
  lcd.print(randomNumber);
  lcd.setCursor(9, 1);
  lcd.print("V");

  delay(DELAY_LOOP);

 //Limpia LCD para permitir actualizar
  lcd.clear();



}
