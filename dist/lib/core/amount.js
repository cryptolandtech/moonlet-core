"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class Amount {
    constructor(value, coin, unit) {
        if (typeof value === 'number') {
            value = new bignumber_js_1.default(value);
        }
        this.value = value;
        this.coin = coin;
        this.withUnit(unit, () => {
            this.value = this.value.multipliedBy(Math.pow(10, -Amount.config.get(coin)[unit]));
        });
    }
    static addConfig(config) {
        if (config && config.mainCoin && config.units) {
            Amount.config.set(config.mainCoin, config.units);
        }
    }
    withUnit(unit, cb) {
        if (unit) {
            if (Amount.config.get(this.coin)) {
                if (Amount.config.get(this.coin)[unit]) {
                    return cb();
                }
                else {
                    throw new Error(`${unit} is not a unit of ${this.coin}.`);
                }
            }
            else {
                throw new Error(`No config for ${this.coin} coin.`);
            }
        }
    }
    ;
    assertSameCoins(coin1, coin2) {
        if (coin1 !== coin2) {
            throw new Error('Cannot add two amounts with different coins');
        }
    }
    plus(amount) {
        this.assertSameCoins(this.coin, amount.coin);
        return new Amount(this.value.plus(amount.toBigNumber()), this.coin);
    }
    minus(amount) {
        this.assertSameCoins(this.coin, amount.coin);
        return new Amount(this.value.minus(amount.toBigNumber()), this.coin);
    }
    dividedBy(amount) {
        this.assertSameCoins(this.coin, amount.coin);
        return new Amount(this.value.dividedBy(amount.toBigNumber()), this.coin);
    }
    multipliedBy(amount) {
        this.assertSameCoins(this.coin, amount.coin);
        return new Amount(this.value.multipliedBy(amount.toBigNumber()), this.coin);
    }
    toBigNumber(unit) {
        let value;
        this.withUnit(unit, () => {
            value = this.value.multipliedBy(Math.pow(10, Amount.config.get(this.coin)[unit]));
        });
        return value || this.value;
    }
    toNumber(unit) {
        return this.toBigNumber(unit).toNumber();
    }
    toString(unit) {
        return this.toBigNumber(unit).toString();
    }
}
Amount.config = new Map();
exports.Amount = Amount;
//# sourceMappingURL=amount.js.map