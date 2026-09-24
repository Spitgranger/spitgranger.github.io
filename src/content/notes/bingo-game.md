---
title: Bingo?
summary: Odds of winning a bingo game.
topic: Probability · Games
status: published 
---
The other day at work, we launched our annual company wide Bingo game. The game is played over a period of 12 weeks, 
with a new Bingo card in play every week. The entire Bingo set has 75 numbers, with 15 numbers drawn each day for 4 days.
There are 2 Bingo boards on a single card that have 25 squares within them, with one being a free space. You have to fill either
one of the Bingo boards to win. Since each Bingo package cost $80, I wanted to calculate the odds of winning to see if it 
would be worth playing.

### The Odds of Winning

Since the 60 numbers are drawn every week and 24 are needed to win, we can calculate the probability of winning on the 4th day as
the probability that the first number is drawn multiplied by all the probabilities up to the 24th number. The probability that the $nth$ winning number is drawn on that day is

$$
\frac{60-n}{75-n}
$$

We can apply the chain rule of probability to get the probability of drawing all 24 winning numbers, conditioning on the fact that the previous winning number has been drawn.

$$
P(A_1 \cap A_2 \cap \dots \cap A_{24}) = P(A_1)P(A_2|A_1) \dots P(A_{24} | A_1 \cap A_2 \cap \dots \cap A_{23})
$$

So the probability of having all 24 winning numbers drawn would be

$$
\prod_{n=0}^{23} \frac{60-n}{75-n}
$$

That is around $0.139\%$ or around 1 in 715. Since there are two boards on a card, the probability of winning on either one 
is $0.139\% * 2 = 0.28\%$

## On a given day what number of winning numbers is lucky?
Since the numbers are drawn over a period of 4 days, does scoring big increase your odds of winning? 
To model the probability of drawing $k$ numbers on a particular day, we can see that this situation 
has the perfect ingredients to follow a hypergeometric distribution. This distribution describes the probability of $k$ successes in $n$ draws without replacement from a finite population of $N$ objects that contains exactly $K$ successes.
This is modeled by the probability mass function:
$$
P(X = k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}
$$
We also know that the expected value for a random variable $X$ that follows a hypergeometric distribution is 

$$
n\frac{K}{N}
$$

We can therefore calculate the expected winning numbers that one would have on any given day within the 4 day period.

$$
E[X_1] = 15\frac{24}{75} = 4.8 
$$
$$
E[X_2] = 30\frac{24}{75} = 9.6 
$$
$$
E[X_3] = 45\frac{24}{75} = 14.4 
$$
$$
E[X_4] = 60\frac{24}{75} = 19.2 
$$

So there we go. The expected number of winning numbers on day 4 is 19.2.

Now to answer the question of scoring big, if you scored $k$ winning numbers on day 1, you would need $24 - k$ winning numbers on the remaining days to win. Out of the remaining 60 numbers 45 of them will be drawn, so we can once again calculate the probability of winning given that $k$ numbers are drawn on the first day as:


$$
P(win \mid k) = \frac{\binom{36+k}{15}}{\binom{60}{15}}
$$

This uses the opposite approach of thinking, the probability that you win is equal to the probability that there are none of your winning numbers among the 15 numbers that are not drawn.


| Day one hits ($k$) | Probability of winning | 
| ------------------ | ---------------------- | 
| 2                  | 0.029%                 | 
| 4                  | 0.076%                 | 
| 5                  | 0.119%                 | 
| 8                  | 0.432%                 | 

So yes, scoring big earlier does increase your chance of winning.

## Worth it?

The probability of someone winning in a given week (assuming 400 people are playing) is
$$
P(\text{someone wins in a week}) = 1 - (1 - 0.0028)^{400} \approx 67\%
$$
Since all cards are independent that your card wins is $\frac{0.674}{400}$ or about 1 in 594.


$$
\text{Expected winnings per week} = J \times \frac{1}{594}
$$
$$
\text{Cost per week} = \frac{\text{package price}}{\text{weeks remaining}}
$$
$$
\frac{J}{594} = \text{cost per week} \quad\Rightarrow\quad J = \text{cost per week} \times 594
$$
Where $J$ is the jackpot for that week. At $80 your cost per week would be around $6.67. That means you would require the jackpot to be worth on average $3961.98 to break even.


## One more thing

The hypergeometric distribution connects directly with the odds of winning originally calculated above. We can calculate the probability of having 24 winning numbers at day 4:

$$
P(X = 24) = \frac{\binom{24}{24} \binom{51}{36}}{\binom{75}{60}}
$$

$$
 = \frac{\binom{51}{36}}{\binom{75}{60}}
 $$
$$
 = 0.00139
 $$

Two ways of reasoning to reach the same result. Pretty neat don't you think?