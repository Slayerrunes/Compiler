set ANTLR="C:\Users\weary\source\repos\antlr-4.8-complete.jar"
set JAVA="C:\Program Files\AdoptOpenJDK\jdk-11.0.7.10-hotspot\bin\java.exe"
%JAVA% -cp %ANTLR% org.antlr.v4.Tool -Dlanguage=JavaScript "%1"