

#include <LiquidCrystal.h>

// Parametros de lcd: (rs, enable, d4, d5, d6, d7)
LiquidCrystal lcd(9, 8, 5, 4, 3, 2);

int DELAY_LOOP=2000;
int randomNumber;
String p1=",";
String tension="Tension: ";
String v=" V";


void setup() {
  

  Serial.begin(9600);
  //16 columnas ,2 filas
  lcd.begin(16, 2);
  
}

void loop() {

 randomNumber=random(200,225);
  // Envia informacion a puerto serial
  Serial.println(tension+randomNumber+v+p1+"date:"+millis());



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