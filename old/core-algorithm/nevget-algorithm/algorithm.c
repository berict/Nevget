#include <stdio.h>
#include <math.h>

static double p = 2.42;
int today = 1;
int last_interval_date = 0;
double interval = 1;
double e = 2.71828;

double remRate(double date, double interval) {
	return pow(e, (-1 * (date / pow(interval, p))));
}

void sendEmail() {
	printf("\nEmail sent\n");
}

void main() {
	int day = 0;
	while (1) {
		day = today - last_interval_date;
		printf("Day %d\n", today);
		printf("Remember rate : %.3lf\n\n", remRate(day, interval));
		if (remRate(day, interval) <= 0.9) {
			// interval
			interval;
			last_interval_date = today;
		}
		today++;
		getch();
	}
}