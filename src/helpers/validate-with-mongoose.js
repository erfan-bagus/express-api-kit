import isEmpty from 'is-empty';
import debugLogger from 'debug-logger';

const log = debugLogger('validateWithMongoose');

const validate = (item, rules, name) => {
	if (!isEmpty(rules.required) && rules.required[0] && isEmpty(item)) {
		const err = rules.required[1];
		log.warn(name, err);
		return err;
	}
	if (!isEmpty(rules.validate)) {
		if (Array.isArray(rules.validate)) {
			for (let i = 0; i < rules.validate.length; i += 1) {
				if (!rules.validate[i].validator(item)) {
					const err = rules.validate[i].message;
					log.warn(name, err);
					return err;
				}
			}
		} else if (!rules.validate.validaor(item)) {
			const err = rules.validate.message;
			log.warn(name, err);
			return err;
		}
	}
	log.info(name, 'return undefined error');
	return undefined;
};

export default validate;
