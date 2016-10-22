#include <stdio.h>
#include <math.h>
#include <conio.h>

static double e = 2.71828182846;
int today = 1;
int level = 0;
int last_interval_date = 0;

void main() {
	printf("User age : %d\n\n", 20);
	while (1) {
		printf("Day %d\n", today);

		double date_passed = today - last_interval_date;
		double rate = (double)(1 - pow(e, -1.0 * ((double)date_passed / (double)(2 * (pow(level, 2.42))))));
		printf("Remember rate : %.3lf\n\n", rate);
		if (rate <= 0.900) {
			// under 90%, interval
			level++;
			last_interval_date = today;

			printf("==========================\n");
			printf("Email sent : on level %d\n", level - 1);
			printf("           : at day %d\n", today);
			printf("           : user age %d\n", 20);
			printf("==========================\n\n");
		}

		getch();
		today++;
	}
}