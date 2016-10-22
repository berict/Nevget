#include <stdio.h>
#include <math.h>
#include <conio.h>

static double POW = 2.42; 
// change this for various user age
// increase for longer interval, vice versa

int today = 1;
int level = 0;
int created_date = 0;
int last_interval_date = 0;
int age = 20;
double rate = 0;
static double e = 2.71828182846;

void sendEmail() {
	printf("==========================\n");
	printf("Email sent : on level %d\n", level - 1);
	printf("           : at day %d\n", today);
	printf("           : user age %d\n", age);
	printf("==========================\n\n");
}

void interval() {
	double date_passed = today - last_interval_date;
	double rate = (double)(1 - pow(e, -1.0 * ((double)date_passed / (double)(1.0 * (pow(level, 2.42))))));
	printf("Remember rate : %.3lf\n\n", rate);
	if (0 <= 0.900) {
		// under 90%, interval
		level++;
		last_interval_date = today;
		sendEmail();
	}
}

void main() {
	printf("User age : %d\n\n", age);
	while (1) {
		printf("Day %d\n", today);
		interval();
		getch();
		today++;
	}
}