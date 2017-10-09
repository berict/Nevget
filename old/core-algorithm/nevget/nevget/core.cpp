#include <stdio.h>
#include <conio.h>
#include <math.h>

float x = 0, y = 0;
float level = 1;
float last_interval_date = 0;
// https://www.desmos.com/calculator/lhwfudnxsj

void sendEmail(int level, int x, int age) {
	printf("==========================\n");
	printf("Email sent : on level %d\n", level - 1);
	printf("           : at day %.3f\n", (x + last_interval_date));
	printf("           : user age %d\n", age);
	printf("==========================\n\n");
}

void main() {
	int age = 20;
	float e = 2.71828182;

	printf("Input any other key to exit\n\n");

	while (age <= 0) {
		printf("Enter correct user age : ");
		scanf("%d", &age);
	}

	while (1) {
		printf("time %.2f\n", (x + last_interval_date));
		y = pow(e, -(x / (1.898 * (pow(level, 2)))));
		printf("Forget y : %f / 1\n\n", y);
		if (y <= 0.9)
		{
			level++;
			last_interval_date += x;
			x = 0;
			sendEmail(level, x, age);
		}
		getch();
		x += 0.1;
	}
}