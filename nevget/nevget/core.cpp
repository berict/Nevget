#include <stdio.h>
#include <math.h>
#include <conio.h>

static float POW = 2.42; 
// change this for various user age
// increase for longer interval, vice versa

int today = 1;
int level = 0;
int created_date = 0;
int last_interval_date = 0;
float rate = 0;

float getE() {
	float e = pow(1 + 1.0 / 100, 100);
	return e;
}

int forgetRate(int date_passed, int level) {
	// the graph
	// https://www.desmos.com/calculator/lhwfudnxsj
	float e = getE();
	rate = (float)(1 - pow(e, -(date_passed / (1 * (pow(level, 2.42))))));
	printf("Forget rate : %.3f / 1\n\n", rate);
	// return in %
	return rate;
}

int interval(int today, int last_interval_date) {
	// returns true (1) or false (0)
	// doesnt use age for now
	float rate = forgetRate((today - last_interval_date), level) * (float)100;
	if (rate <= 90) {
		// under 90%, interval
		level++;
		last_interval_date = today;
		return 1;
	}
	else {
		return 0;
	}
}

void sendEmail(int level, int today, int age) {
	printf("==========================\n");
	printf("Email sent : on level %d\n", level - 1);
	printf("           : at day %d\n", today);
	printf("           : user age %d\n", age);
	printf("==========================\n\n");
}

void main() {
	char status[10] = "";
	int age = 20;

	printf("Input any other key to exit\n\n");
	//printf("Enter user age : ");
	//scanf("%d", &age);

	while (age <= 0) {
		printf("Enter correct user age : ");
		scanf("%d", &age);
	}

	while (1) {
		printf("Day %d\n", today);
		int itvl = interval(today, last_interval_date);
		if (itvl == 1) {
			sendEmail(level, today, age);
		}
		getch();
		today++;
	}
}